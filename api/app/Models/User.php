<?php

namespace App\Models;

use Database\Helpers\ApiEnums;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Auth\Authenticatable as AuthenticatableTrait;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

/**
 * Class User
 *
 * @property string $id
 * @property string $email
 * @property string $sub
 * @property string $first_name
 * @property string $last_name
 * @property string $telephone
 * @property string $preferred_lang
 * @property array $roles
 * @property string $job_looking_status
 * @property string $current_province
 * @property string $current_city
 * @property boolean $looking_for_english
 * @property boolean $looking_for_french
 * @property boolean $looking_for_bilingual
 * @property string $bilingual_evaluation
 * @property string $comprehension_level
 * @property string $written_level
 * @property string $verbal_level
 * @property string $estimated_language_ability
 * @property string $is_gov_employee
 * @property string $interested_in_later_or_secondment
 * @property string $current_classification
 * @property boolean $is_woman
 * @property boolean $has_disability
 * @property boolean $is_indigenous
 * @property boolean $is_visible_minority
 * @property boolean $has_diploma
 * @property string $language_ability
 * @property array $location_preferences
 * @property string $location_exemptions
 * @property array $expected_salary
 * @property boolean $would_accept_temporary
 * @property array $accepted_operational_requirements
 * @property string $gov_employee_type
 * @property Illuminate\Support\Carbon $created_at
 * @property Illuminate\Support\Carbon $updated_at
 */

class User extends Model implements Authenticatable
{
    use HasFactory;
    use SoftDeletes;
    use AuthenticatableTrait;

    protected $keyType = 'string';

    protected $casts = [
        'roles' => 'array',
        'location_preferences' => 'array',
        'expected_salary' => 'array',
        'accepted_operational_requirements' => 'array',
    ];

    public function pools(): HasMany
    {
        return $this->hasMany(Pool::class);
    }
    public function poolCandidates(): HasMany
    {
        return $this->hasMany(PoolCandidate::class);
    }
    public function currentClassification(): BelongsTo
    {
        return $this->belongsTo(Classification::class, "current_classification");
    }
    public function expectedClassifications(): BelongsToMany
    {
        return $this->belongsToMany(Classification::class, 'classification_user')->withTimestamps();
    }
    public function cmoAssets(): BelongsToMany
    {
        return $this->belongsToMany(CmoAsset::class)->withTimestamps();
    }

    public function isAdmin(): bool
    {
        return in_array('ADMIN', $this->roles);
    }

    // All the relationships for experiences
    public function awardExperiences(): HasMany
    {
        return $this->hasMany(AwardExperience::class);
    }
    public function communityExperiences(): HasMany
    {
        return $this->hasMany(CommunityExperience::class);
    }
    public function educationExperiences(): HasMany
    {
        return $this->hasMany(EducationExperience::class);
    }
    public function personalExperiences(): HasMany
    {
        return $this->hasMany(PersonalExperience::class);
    }
    public function workExperiences(): HasMany
    {
        return $this->hasMany(WorkExperience::class);
    }
    public function getExperiencesAttribute()
    {
        $collection = collect();
        $collection = $collection->merge($this->awardExperiences);
        $collection = $collection->merge($this->communityExperiences);
        $collection = $collection->merge($this->educationExperiences);
        $collection = $collection->merge($this->personalExperiences);
        $collection = $collection->merge($this->workExperiences);
        return $collection;
    }

    // getIsProfileCompleteAttribute function is correspondent to isProfileComplete attribute in graphql schema
    public function getIsProfileCompleteAttribute(): bool
    {if(is_null($this->attributes['first_name']) Or
        is_null($this->attributes['last_name']) Or
        is_null($this->attributes['email']) Or
        is_null($this->attributes['telephone']) Or
        is_null($this->attributes['preferred_lang']) Or
        is_null($this->attributes['current_province']) Or
        is_null($this->attributes['current_city']) Or
            (is_null($this->attributes['looking_for_english']) &&
            is_null($this->attributes['looking_for_french']) &&
            is_null($this->attributes['looking_for_bilingual'])) Or
        is_null($this->attributes['is_gov_employee']) Or
        is_null($this->attributes['location_preferences']) Or
        is_null($this->attributes['expected_salary']) Or
        is_null($this->attributes['would_accept_temporary'])
        )   {
            return false;
            }
        else{
            return true;
        }
    }

     /**
     * Boot function for using with User Events
     *
     * @return void
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model)
        {
            $model->generateSubject();
        });
    }

     /**
     * Generates the value for the User::sub field. Used to
     * support authentication.
     * @return bool
     */
    protected function generateSubject()
    {
        // TODO when moving to Sign In Canada we won't be using email any more

        // fill sub with email if not already filled
        if( !array_key_exists('sub', $this->attributes) )
            $this->attributes['sub'] = $this->attributes['email'];

        if( is_null($this->attributes['sub']) )
            return false; // failed to create subject
        else
            return true;
    }

    // Search filters
    public function filterByPools(Builder $query, array $pools): Builder
    {
        if (empty($pools)) {
            return $query;
        }

        // Pool acts as an OR filter. The query should return candidates in ANY of the pools.
        $query->whereExists(function ($query) use ($pools) {
            $query->select('id')
                  ->from('pool_candidates')
                  ->whereColumn('pool_candidates.user_id', 'users.id')
                  ->whereIn('pool_candidates.pool_id', $pools);
        });
        return $query;
    }
    public function filterByLanguageAbility(Builder $query, ?string $languageAbility): Builder
    {
        // If filtering for a specific language the query should return candidates of that language OR bilingual.
        $query->where(function($query) use ($languageAbility) {
            $query->where('language_ability', $languageAbility);
            if ($languageAbility == ApiEnums::LANGUAGE_ABILITY_ENGLISH || $languageAbility == ApiEnums::LANGUAGE_ABILITY_FRENCH) {
                $query->orWhere('language_ability', ApiEnums::LANGUAGE_ABILITY_BILINGUAL);
            }
        });
        return $query;
    }
    public function filterByOperationalRequirements(Builder $query, ?array $operationalRequirements): Builder
    {
        // if no filters provided then return query unchanged
        if (empty($operationalRequirements)) {
            return $query;
        }

        // OperationalRequirements act as an AND filter. The query should only return candidates willing to accept ALL of the requirements.
            $query->whereJsonContains('accepted_operational_requirements', $operationalRequirements);
        return $query;
    }
    public function filterByLocationPreferences(Builder $query, array $locations): Builder
    {
        // LocationPreferences acts as an OR filter. The query should return candidates willing to work in ANY of the locations.
        $query->where(function($query) use ($locations) {
            foreach($locations as $index => $location) {
                if ($index === 0) {
                    // First iteration must use where instead of orWhere
                    $query->whereJsonContains('location_preferences', $location);
                } else {
                    $query->orWhereJsonContains('location_preferences', $location);
                }
            }
        });
        return $query;
    }
    public function filterBySkills(Builder $query, array $skills): Builder
    {
        if (empty($skills)) {
            return $query;
        }

        // skills act as an AND filter. The query should only return candidates with ALL of the skills.
        $query->whereExists(function ($query) use ($skills) {
            $query->select(DB::raw('null'))
            ->from(function ($query) {
                $query->selectRaw('experiences.user_id, jsonb_agg(experience_skills.skill_id) as user_skills_grouped')
                ->from('experience_skills')
                ->joinSub(function ($query) {
                    $query->select('award_experiences.id as experience_id', 'award_experiences.user_id')
                    ->from('award_experiences')
                    ->unionAll(function ($query) {
                        $query->select('community_experiences.id as experience_id', 'community_experiences.user_id')
                        ->from('community_experiences');
                    })
                    ->unionAll(function ($query) {
                        $query->select('education_experiences.id as experience_id', 'education_experiences.user_id')
                        ->from('education_experiences');
                    })
                    ->unionAll(function ($query) {
                        $query->select('personal_experiences.id as experience_id', 'personal_experiences.user_id')
                        ->from('personal_experiences');
                    })
                    ->unionAll(function ($query) {
                        $query->select('work_experiences.id as experience_id', 'work_experiences.user_id')
                        ->from('work_experiences');
                    });
                }, 'experiences', function ($join) {
                    $join->on('experience_skills.experience_id', '=', 'experiences.experience_id');
                })
                ->groupBy('experiences.user_id');
            }, "aggregate_experiences")
            ->whereJsonContains('aggregate_experiences.user_skills_grouped', $skills)
            ->whereColumn('aggregate_experiences.user_id', 'users.id');
        });
        return $query;
    }
    public function filterByClassifications(Builder $query, array $classifications): Builder
    {
        // Classifications act as an OR filter. The query should return candidates with any of the classifications.
        // A single whereHas clause for the relationship, containing multiple orWhere clauses accomplishes this.
        $query->whereHas('expectedClassifications', function ($query) use ($classifications) {
            foreach ($classifications as $index => $classification) {
                if ($index === 0) {
                    // First iteration must use where instead of orWhere
                    $query->where(function($query) use ($classification) {
                        $query->where('group', $classification['group'])->where('level', $classification['level']);
                    });
                } else {
                    $query->orWhere(function($query) use ($classification) {
                        $query->where('group', $classification['group'])->where('level', $classification['level']);
                    });
                }
            }

            $this->orFilterByClassificationToSalary($query, $classifications);
        });

        return $query;
    }
    private function orFilterByClassificationToSalary(Builder $query, array $classifications): Builder
    {
        // When managers search for a classification, also return any users whose expected salary
        // ranges overlap with the min/max salaries of any of those classifications.
        // Since salary ranges are text enums a custom SQL subquery is used to convert them to
        // numeric values and compare them to specified classifications

        // This subquery only works for a non-zero number of filter classifications.
        // If passed zero classifications then return same query builder unchanged.
        if(count($classifications) == 0)
            return $query;

        $parameters = [];
        $sql = <<<RAWSQL1

SELECT NULL    -- find all candidates where a salary/group combination matches a classification filter
  FROM (
    SELECT    -- convert salary ranges to numeric min/max values
      t.user_id,
      CASE t.salary_range_id
        WHEN '_50_59K' THEN 50000
        WHEN '_60_69K' THEN 60000
        WHEN '_70_79K' THEN 70000
        WHEN '_80_89K' THEN 80000
        WHEN '_90_99K' THEN 90000
        WHEN '_100K_PLUS' THEN 100000
      END min_salary,
      CASE t.salary_range_id
        WHEN '_50_59K' THEN 59999
        WHEN '_60_69K' THEN 69999
        WHEN '_70_79K' THEN 79999
        WHEN '_80_89K' THEN 89999
        WHEN '_90_99K' THEN 99999
        WHEN '_100K_PLUS' THEN 2147483647
      END max_salary,
      t.classification_group
    FROM (
      SELECT    -- find all combinations of salary range and classification group for each candidate
        users.id user_id,
        JSONB_ARRAY_ELEMENTS_TEXT(users.expected_salary) salary_range_id,
        c.group classification_group
      FROM users
      JOIN classification_user cu ON users.id = cu.user_id
      JOIN classifications c ON cu.classification_id = c.id
    ) t
  ) u
  JOIN classifications c ON
    c.max_salary >= u.min_salary
    AND c.min_salary <= u.max_salary
    AND c.group = u.classification_group
  WHERE (

RAWSQL1;

        foreach ($classifications as $index => $classification) {
            if ($index === 0) {
                // First iteration must use where instead of orWhere
                $sql .= '(c.group = ? AND c.level = ?)';
            } else {
                $sql .= ' OR (c.group = ? AND c.level = ?)';
            }
            array_push($parameters, [$classification['group'], $classification['level']]);
        }

        $sql .= <<<RAWSQL2
  )
  AND u.user_id = "users".id

RAWSQL2;

        return $query->orWhereRaw('EXISTS (' . $sql . ')', $parameters);
    }

    public function scopeHasDiploma(Builder $query, bool $hasDiploma): Builder
    {
        if ($hasDiploma) {
            $query->where('has_diploma', true);
        }
        return $query;
    }
    public function scopeWouldAcceptTemporary(Builder $query, bool $wouldAcceptTemporary): Builder
    {
        if ($wouldAcceptTemporary) {
            $query->where('would_accept_temporary', true);
        }
        return $query;
    }
    public function scopeIsGovEmployee(Builder $query, bool $isGovEmployee): Builder
    {
        if ($isGovEmployee) {
            $query->where('is_gov_employee', true);
        }
        return $query;
    }
}
