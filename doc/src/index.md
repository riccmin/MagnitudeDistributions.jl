# MagnitudeDistributions.jl Documentation

MagnitudeDistributions is a package developed to facilitate the analysis of frequency-magnitude 
distributions of earthquakes. It provides methods to:
  - estimate the magnitude of completeness;
  - estimate the parameters of a frequency-magnitude distribution, such as the b-value;
  - sample a theoretical frequency magnitude distribution.


As of now, only the Gutenberg-Richter law is supported.

## Installation

```julia
import Pkg
Pkg.add("MagnitudeDistributions")
```