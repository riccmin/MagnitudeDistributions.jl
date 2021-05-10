push!(LOAD_PATH,"../src/")
using Documenter, MagnitudeDistributions, Distributions, Random

makedocs(sitename="MagnitudeDistributions.jl",
         pages=[
           "Home"=>"index.md",
           "Magnitude of completeness"=>"completeness.md",
           "Frequency-magnitude distributions"=>"distributions.md",
           "How-to"=>["Magnitude of completeness"=>"howto/mc.md",
                      "b-value"=>"howto/b.md"],
           "Utils"=>"utils.md",
              ])

deploydocs(
    repo = "github.com/riccmin/MagnitudeDistributions.jl.git",
    devbranch = "main"
)