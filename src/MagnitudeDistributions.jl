module MagnitudeDistributions

using StatsBase, Statistics, Distributions, Random
using HypothesisTests # MannWhitneyUTest in mbass

export histmag # utils
export maxcurv, mbass, mbs # Magnitude of completeness
export GRclassic, fit_mle, fit_binned, fit_stderr, fit_stderrbinned # distributions
export bvalue, avalue

# utils
include("./utils/binning.jl")

# magnitude of completeness
include("./completeness/maxc.jl")
include("./completeness/mbass.jl")
include("./completeness/mbs.jl")

# frequency magnitude distributions
include("./distributions/GRclassic.jl")
include("./distributions/univariates.jl")

end
