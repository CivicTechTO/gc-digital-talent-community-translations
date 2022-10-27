<?php

namespace App\Rules;

use App\Models\PoolCandidate;
use Illuminate\Contracts\Validation\Rule;

class NotAlreadyApplied implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($poolId)
    {
        $this->poolId = $poolId;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        return !PoolCandidate::where('user_id', $value)
            ->where('pool_id', $this->poolId)
            ->exists();
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'AlreadyAppliedToPool';
    }
}
