using MagnitudeDistributions, Distributions, Random
using Test


tests = ["grclassic",
         "utils",
         "completeness",
         "likelihood"]

printstyled("Running tests:\n", color=:blue)


for t in tests
    @testset "Test $t" begin
        Random.seed!(10)
        include("$t.jl")
    end
end

# print method ambiguities
println("Potentially stale exports: ")
display(Test.detect_ambiguities(MagnitudeDistributions))
println()