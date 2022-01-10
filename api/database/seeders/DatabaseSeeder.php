<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Pool;
use App\Models\PoolCandidate;
use App\Models\PoolCandidateFilter;
use App\Models\PoolCandidateSearchRequest;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->truncateTables();

        $this->call(ClassificationSeeder::class);
        $this->call(CmoAssetSeeder::class);
        $this->call(OperationalRequirementSeeder::class);
        $this->call(DepartmentSeeder::class);

        $this->call(UserSeeder::class);
        $this->call(PoolSeeder::class);

        PoolCandidate::factory()
            ->count(60)
            ->state(new Sequence(
                fn () => ['pool_id' => Pool::inRandomOrder()->first()->id],
            ))
            ->create();

        PoolCandidateSearchRequest::factory()->count(10)->create();
    }

    // drop all rows from some tables so that the seeder can fill them fresh
    private function truncateTables()
    {
        PoolCandidateFilter::truncate();
        PoolCandidateSearchRequest::truncate();
        User::truncate();
    }
}
