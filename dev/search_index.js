var documenterSearchIndex = {"docs":
[{"location":"howto/b/#How-to:-b-value","page":"b-value","title":"How-to: b-value","text":"","category":"section"},{"location":"howto/b/#Input-magnitudes","page":"b-value","title":"Input magnitudes","text":"","category":"section"},{"location":"howto/b/","page":"b-value","title":"b-value","text":"The input magnitudes are obtained by randomly sampling an exponential distribution (see  GRclassic(b, M0)). ","category":"page"},{"location":"howto/b/","page":"b-value","title":"b-value","text":"julia> using MagnitudeDistributions, Random\n\njulia> Random.seed!(10) # to make results reproducible\n\njulia> b = 1.0    # b-value\n1.0\n\njulia> M0 = 0.5   # minimum magnitude\n0.5\n\njulia> N = 100000 # number of samples\n100000\n\njulia> mags = rand(GRclassic(b,M0), N)\n100000-element Vector{Float64}:\n 0.6547030177365674\n 0.8281037053138567\n 0.7333794310588824\n 0.5297096511820081\n 0.6157440864903895\n 0.6853284272158914\n 0.6770055323153921\n 1.4078926858640064\n 0.8328259467173961\n 0.5970215201942995\n ⋮\n 0.5477099988280166\n 0.6028098601689204\n 0.6851950631472131\n 2.827905395338248\n 0.9037936556932051\n 0.6591458976137341\n 0.7174070167764743\n 0.537132931002749\n 0.6651972372624756","category":"page"},{"location":"howto/b/#Estimation","page":"b-value","title":"Estimation","text":"","category":"section"},{"location":"howto/b/","page":"b-value","title":"b-value","text":"The b-value can be computed with the method of Aki-Utsu (see fit_mle(D::Type{<:GRclassic}, mags, M0)): ","category":"page"},{"location":"howto/b/","page":"b-value","title":"b-value","text":"julia> GRfit = fit_mle(GRclassic, mags, M0)\nGRclassic{Float64, Float64}(b=1.0017187780348895, M0=0.5)","category":"page"},{"location":"howto/b/","page":"b-value","title":"b-value","text":"note: Note\nWhen dealing with binned magnitudes, the method of Tinti and Mulargia should be used instead  (see fit_binned(D::Type{<:GRclassic}, mags, M0, ΔM)).","category":"page"},{"location":"howto/b/#Uncertainty","page":"b-value","title":"Uncertainty","text":"","category":"section"},{"location":"howto/b/","page":"b-value","title":"b-value","text":"The stadard error affecting the b-value can be estimated with bootstrap. This can be  achieved with Bootstrap.jl. ","category":"page"},{"location":"howto/b/","page":"b-value","title":"b-value","text":"julia> using Bootstrap\n\njulia> Nboot = 1000  # number of bootstrap samples\n1000\n\njulia>  res = bootstrap(x-> fit_mle(GRclassic,x,M0).b, mags, BasicSampling(1000))\nBootstrap Sampling\n  Estimates:\n     Var │ Estimate  Bias        StdError\n         │ Float64   Float64     Float64\n    ─────┼──────────────────────────────────\n       1 │  1.00172  6.47247e-5  0.00318899\n  Sampling: BasicSampling\n  Samples:  1000\n  Data:     Vector{Float64}: { 100000 }\n\njulia> stderror(res)\n1-element Vector{Float64}:\n 0.0031889945788686844\n","category":"page"},{"location":"howto/b/","page":"b-value","title":"b-value","text":"Alternatively, the uncertainty can also be determined directly with the method of Shi and Bolt (see fit_stderr(D::Type{<:GRclassic}, mags)):","category":"page"},{"location":"howto/b/","page":"b-value","title":"b-value","text":"julia> fit_stderr(GRfit, mags)\n0.003165105319481647","category":"page"},{"location":"distributions/#Frequency-Magnitude-Distributions","page":"Frequency-magnitude distributions","title":"Frequency-Magnitude Distributions","text":"","category":"section"},{"location":"distributions/#Distributions","page":"Frequency-magnitude distributions","title":"Distributions","text":"","category":"section"},{"location":"distributions/","page":"Frequency-magnitude distributions","title":"Frequency-magnitude distributions","text":"GRclassic","category":"page"},{"location":"distributions/#MagnitudeDistributions.GRclassic","page":"Frequency-magnitude distributions","title":"MagnitudeDistributions.GRclassic","text":"GRclassic(b, M0)\n\nThe classic Gutenberg-Richter law can be expressed as an exponential distribution with rate β and location M0:  \n\nf(x beta M_0) = beta e^-beta (x-M_0) quad x  M_0\n\nM0 is the minimum magnitude. β and the b-value b are linked by the following relation: beta = blog(10).\n\nGRclassic(1.0, 0.5)  # distribution with a b-value of 1 and minimum magnitude of 0.5\nbvalue(d)     #  get the b-value\nrate(d)       #  get β\nlocation(d)   #  get M0\nparams(d)     #  get the parameters (b, M0)\n\n\n\n\n\n","category":"type"},{"location":"distributions/#Distribution-fitting","page":"Frequency-magnitude distributions","title":"Distribution fitting","text":"","category":"section"},{"location":"distributions/","page":"Frequency-magnitude distributions","title":"Frequency-magnitude distributions","text":"fit_mle(::Type{<:GRclassic}, mags::AbstractArray{<:AbstractFloat}, M0::Real) \nfit_binned(::Type{<:GRclassic}, mags::AbstractArray{<:AbstractFloat}, M0::Real, ΔM::Real) \n\nfit_stderr\nfit_stderrbinned","category":"page"},{"location":"distributions/#Distributions.fit_mle-Tuple{Type{#s1} where #s1<:GRclassic,AbstractArray{#s2,N} where N where #s2<:AbstractFloat,Real}","page":"Frequency-magnitude distributions","title":"Distributions.fit_mle","text":"fit_mle(D::Type{<:GRclassic}, mags, M0)\n\nUse the maximum likelihood method to determine the GRclassic distribution fitting the  input data. The function calculates the b-value with the method of Aki-Utsu.\n\nArguments\n\nD: distribution type (see GRclassic(b, M0)).\nmags: array storing magnitude values greater than or equal to the magnitude of completeness M0. \nM0: magnitude of completeness. See Magnitude of completeness for    methods that can be used to estimate it.\n\nThe standard error affecting the b-value can be estimated with fit_stderr(D::Type{<:GRclassic}, mags)\n\nReferences\n\nAki, 1965. Maximum Likelihood Estimate of b in the Formula logN=a-bM and its Confidence Limits. Belletin of the Earthquake Research Institute, 43, 237-239.\nUtsu 1966. A Statistical Significance Test of the Difference in b-value between Two Earthquake Groups. Journal of Physics of the Earth, 14, 37-40.\n\n\n\n\n\n","category":"method"},{"location":"distributions/#MagnitudeDistributions.fit_binned-Tuple{Type{#s2} where #s2<:GRclassic,AbstractArray{#s1,N} where N where #s1<:AbstractFloat,Real,Real}","page":"Frequency-magnitude distributions","title":"MagnitudeDistributions.fit_binned","text":"fit_binned(D::Type{<:GRclassic}, mags, M0, ΔM)\n\nDetermine the GRclassic distribution fitting the input data.  This function corresponds to the method of Tinti and Mulargia, which was designed to properly estimate the b-value from binned magnitude values.\n\nArguments\n\nD: distribution type (see GRclassic(b, M0)).\nmags: array storing binned magnitude values greater than or equal to the magnitude of completeness M0\nM0: magnitude of completeness. See Magnitude of completeness for methods that   can be used to estimate it.\nΔM: bin width used to group the magnitude values.`\n\nThe standard error affecting the b-value can be estimated with fit_stderrbinned(D::Type{<:GRclassic}, mags, ΔM)\n\nReferences\n\nTinti and Mulargia, 1987. Confidence intervals of b values for grouped magnitudes.  Bulletin of the Seismological Society of America, 77 (6), 2125–2134. \n\n\n\n\n\n","category":"method"},{"location":"distributions/#MagnitudeDistributions.fit_stderr","page":"Frequency-magnitude distributions","title":"MagnitudeDistributions.fit_stderr","text":"fit_stderr(D::Type{<:GRclassic}, mags)\n\nApply the method of Shi and Bolt to calculate the standard error affecting a b-value determined with the method of Aki-Utsu fit_mle(D::Type{<:GRclassic}, mags, M0). \n\nArguments\n\nD: distribution type (see GRclassic(b, M0)).\nmags: array storing magnitude values greater than or equal to the magnitude of completeness.\n\nReferences\n\nShi and Bolt, 1982. The standard error of the magnitude-frequency b value. Bulletin of the Seismological Society of America, 72, 1677-1687.\n\n\n\n\n\n","category":"function"},{"location":"distributions/#MagnitudeDistributions.fit_stderrbinned","page":"Frequency-magnitude distributions","title":"MagnitudeDistributions.fit_stderrbinned","text":"fit_stdbinned(D::Type{<:GRclassic}, mags, ΔM)\n\nCalculate the standard error affecting a b-value estimated with the method of Tinti and Mulargia (fit_binned(D::Type{<:GRclassic}, mags, M0, ΔM)).\n\nArguments\n\nD: distribution type (see GRclassic(b, M0)).\nmags: array storing magnitude values greater than or equal to the magnitude of completeness.\nΔM: bin width used to group the magnitude values.`\n\nReferences\n\nTinti and Mulargia, 1987. Confidence intervals of b values for grouped magnitudes.  Bulletin of the Seismological Society of America, 77 (6), 2125–2134. \n\n\n\n\n\n","category":"function"},{"location":"distributions/#Sampling","page":"Frequency-magnitude distributions","title":"Sampling","text":"","category":"section"},{"location":"distributions/","page":"Frequency-magnitude distributions","title":"Frequency-magnitude distributions","text":"rand(::AbstractRNG, ::UnivariateDistribution)","category":"page"},{"location":"distributions/#Base.rand-Tuple{AbstractRNG,Distribution{Univariate,S} where S<:ValueSupport}","page":"Frequency-magnitude distributions","title":"Base.rand","text":"rand(rng::AbstractRNG, d::UnivariateDistribution)\n\nGenerate a scalar sample from d. The general fallback is quantile(d, rand()).\n\n\n\n\n\n","category":"method"},{"location":"distributions/#Parameter-Retrieval","page":"Frequency-magnitude distributions","title":"Parameter Retrieval","text":"","category":"section"},{"location":"distributions/","page":"Frequency-magnitude distributions","title":"Frequency-magnitude distributions","text":"params(::UnivariateDistribution)\nscale(::UnivariateDistribution)\nlocation(::UnivariateDistribution)\nrate(::UnivariateDistribution)\nbvalue(::UnivariateDistribution)","category":"page"},{"location":"distributions/#StatsBase.params-Tuple{Distribution{Univariate,S} where S<:ValueSupport}","page":"Frequency-magnitude distributions","title":"StatsBase.params","text":"params(d::UnivariateDistribution)\n\nReturn a tuple of parameters. Let d be a distribution of type D, then D(params(d)...) will construct exactly the same distribution as d.\n\n\n\n\n\n","category":"method"},{"location":"distributions/#Distributions.scale-Tuple{Distribution{Univariate,S} where S<:ValueSupport}","page":"Frequency-magnitude distributions","title":"Distributions.scale","text":"scale(d::UnivariateDistribution)\n\nGet the scale parameter.\n\n\n\n\n\n","category":"method"},{"location":"distributions/#Distributions.location-Tuple{Distribution{Univariate,S} where S<:ValueSupport}","page":"Frequency-magnitude distributions","title":"Distributions.location","text":"location(d::UnivariateDistribution)\n\nGet the location parameter.\n\n\n\n\n\n","category":"method"},{"location":"distributions/#Distributions.rate-Tuple{Distribution{Univariate,S} where S<:ValueSupport}","page":"Frequency-magnitude distributions","title":"Distributions.rate","text":"rate(d::UnivariateDistribution)\n\nGet the rate parameter.\n\n\n\n\n\n","category":"method"},{"location":"distributions/#MagnitudeDistributions.bvalue-Tuple{Distribution{Univariate,S} where S<:ValueSupport}","page":"Frequency-magnitude distributions","title":"MagnitudeDistributions.bvalue","text":"bvalue(::UnivariateDistribution)\n\nGet the b-value\n\n\n\n\n\n","category":"method"},{"location":"distributions/#Probability-Evaluation","page":"Frequency-magnitude distributions","title":"Probability Evaluation","text":"","category":"section"},{"location":"distributions/","page":"Frequency-magnitude distributions","title":"Frequency-magnitude distributions","text":"pdf(::UnivariateDistribution, ::Real)\nlogpdf(::UnivariateDistribution, ::Real)\ncdf(::UnivariateDistribution, ::Real)\nlogcdf(::UnivariateDistribution, ::Real)\nccdf(::UnivariateDistribution, ::Real)\nlogccdf(::UnivariateDistribution, ::Real)\n","category":"page"},{"location":"distributions/#Distributions.pdf-Tuple{Distribution{Univariate,S} where S<:ValueSupport,Real}","page":"Frequency-magnitude distributions","title":"Distributions.pdf","text":"pdf(d::UnivariateDistribution, x::Real)\n\nEvaluate the probability density (mass) at x.\n\nSee also: logpdf.\n\n\n\n\n\n","category":"method"},{"location":"distributions/#Distributions.logpdf-Tuple{Distribution{Univariate,S} where S<:ValueSupport,Real}","page":"Frequency-magnitude distributions","title":"Distributions.logpdf","text":"logpdf(d::UnivariateDistribution, x::Real)\n\nEvaluate the logarithm of probability density (mass) at x.\n\nSee also: pdf.\n\n\n\n\n\n","category":"method"},{"location":"distributions/#Distributions.cdf-Tuple{Distribution{Univariate,S} where S<:ValueSupport,Real}","page":"Frequency-magnitude distributions","title":"Distributions.cdf","text":"cdf(d::UnivariateDistribution, x::Real)\n\nEvaluate the cumulative probability at x.\n\nSee also ccdf, logcdf, and logccdf.\n\n\n\n\n\n","category":"method"},{"location":"distributions/#Distributions.logcdf-Tuple{Distribution{Univariate,S} where S<:ValueSupport,Real}","page":"Frequency-magnitude distributions","title":"Distributions.logcdf","text":"logcdf(d::UnivariateDistribution, x::Real)\n\nThe logarithm of the cumulative function value(s) evaluated at x, i.e. log(cdf(x)).\n\n\n\n\n\n","category":"method"},{"location":"distributions/#Distributions.ccdf-Tuple{Distribution{Univariate,S} where S<:ValueSupport,Real}","page":"Frequency-magnitude distributions","title":"Distributions.ccdf","text":"ccdf(d::UnivariateDistribution, x::Real)\n\nThe complementary cumulative function evaluated at x, i.e. 1 - cdf(d, x).\n\n\n\n\n\n","category":"method"},{"location":"distributions/#Distributions.logccdf-Tuple{Distribution{Univariate,S} where S<:ValueSupport,Real}","page":"Frequency-magnitude distributions","title":"Distributions.logccdf","text":"logccdf(d::UnivariateDistribution, x::Real)\n\nThe logarithm of the complementary cumulative function values evaluated at x, i.e. log(ccdf(x)).\n\n\n\n\n\n","category":"method"},{"location":"distributions/#Misc","page":"Frequency-magnitude distributions","title":"Misc","text":"","category":"section"},{"location":"distributions/","page":"Frequency-magnitude distributions","title":"Frequency-magnitude distributions","text":"avalue(::UnivariateDistribution, N::Real, ΔM::Real)","category":"page"},{"location":"distributions/#MagnitudeDistributions.avalue-Tuple{Distribution{Univariate,S} where S<:ValueSupport,Real,Real}","page":"Frequency-magnitude distributions","title":"MagnitudeDistributions.avalue","text":"avalue(::UnivariateDistribution, N::Real, ΔM::Real)\n\nGet the a-value of a frequency-magnitude distribution composed of N events grouped into magnitude bins of width ΔM. \n\n\n\n\n\n","category":"method"},{"location":"howto/mc/#How-to:-Magnitude-of-completeness","page":"Magnitude of completeness","title":"How-to: Magnitude of completeness","text":"","category":"section"},{"location":"howto/mc/#Input-magnitudes","page":"Magnitude of completeness","title":"Input magnitudes","text":"","category":"section"},{"location":"howto/mc/","page":"Magnitude of completeness","title":"Magnitude of completeness","text":"The input magnitudes are obtained by randomly sampling an exponential distribution (see  GRclassic(b, M0)). ","category":"page"},{"location":"howto/mc/","page":"Magnitude of completeness","title":"Magnitude of completeness","text":"julia> using MagnitudeDistributions, Random, Distributions\n\njulia> Random.seed!(10) # to make results reproducible\n\njulia> b = 1.0    # b-value\n1.0\n\njulia> M0 = 0.5   # minimum magnitude\n0.5\n\njulia> N = 100000 # number of samples\n100000\n\njulia> mags = rand(GRclassic(b,M0), 100000)\n100000-element Vector{Float64}:\n 0.6547030177365674\n 0.8281037053138567\n 0.7333794310588824\n 0.5297096511820081\n 0.6157440864903895\n 0.6853284272158914\n 0.6770055323153921\n 1.4078926858640064\n 0.8328259467173961\n 0.5970215201942995\n ⋮\n 0.5477099988280166\n 0.6028098601689204\n 0.6851950631472131\n 2.827905395338248\n 0.9037936556932051\n 0.6591458976137341\n 0.7174070167764743\n 0.537132931002749\n 0.6651972372624756","category":"page"},{"location":"howto/mc/","page":"Magnitude of completeness","title":"Magnitude of completeness","text":"To reproduce the incompleteness of real catalogs, a thinning operation  is applied. The thinning is based on the cumulative function of a normal distribution.","category":"page"},{"location":"howto/mc/","page":"Magnitude of completeness","title":"Magnitude of completeness","text":"julia> μ = 1.0  # mean\n1.0\n\njulia> σ = 0.1  # standard deviation\n0.1\n\njulia> filter!(x->rand() < cdf(Normal(μ,σ),x), mags)\n32461-element Vector{Float64}:\n 1.4078926858640064\n 1.4474394687089862\n 1.2115808713475444\n 1.2058593230448573\n 1.144583351332513\n 1.148826610875833\n 1.2266957747843135\n 1.3299669337721514\n 1.3361863582881437\n 0.8173338374496064\n ⋮\n 1.1869995074569266\n 1.2148002763177803\n 1.186895006733359\n 1.5476802837961292\n 0.9156626400345742\n 1.2790798393496807\n 2.3665513040522095\n 1.1021995425749411\n 2.827905395338248\n","category":"page"},{"location":"howto/mc/#Estimation","page":"Magnitude of completeness","title":"Estimation","text":"","category":"section"},{"location":"howto/mc/","page":"Magnitude of completeness","title":"Magnitude of completeness","text":"The magnitude of completeness can be estimated with different algorithms (see Magnitude of completeness).  All of them are based on binned magnitudes, so it is necessary to specify the width of the bins.","category":"page"},{"location":"howto/mc/","page":"Magnitude of completeness","title":"Magnitude of completeness","text":"julia> ΔM = 0.05      # bin width\n0.05\n\njulia> Mcmc = maxcurv(mags, ΔM)  # maximum curvature\n1.112024271406315\n\njulia> Mcmbass = mbass(mags, ΔM) # segment slope\n1.2120242714063152\n\njulia> Mcmbs = mbs(mags, ΔM)     # b-value stability\n1.2120242714063152\n","category":"page"},{"location":"howto/mc/","page":"Magnitude of completeness","title":"Magnitude of completeness","text":"The magnitude of completeness can be used to select the complete part of the catalog.  ","category":"page"},{"location":"howto/mc/","page":"Magnitude of completeness","title":"Magnitude of completeness","text":"note: Note\nThe magnitude of completeness M_c given by maxcurv, mbass and mbs refers to  the center of the bin. This means that the catalog is complete starting from M_c-ΔM2.","category":"page"},{"location":"howto/mc/","page":"Magnitude of completeness","title":"Magnitude of completeness","text":"If the maximum curvature method is chosen:","category":"page"},{"location":"howto/mc/","page":"Magnitude of completeness","title":"Magnitude of completeness","text":"julia> magscomplete = mags[mags .>= Mcmc - ΔM/2]\n25200-element Vector{Float64}:\n 1.4078926858640064\n 1.4474394687089862\n 1.2115808713475444\n 1.2058593230448573\n 1.144583351332513\n 1.148826610875833\n 1.2266957747843135\n 1.3299669337721514\n 1.3361863582881437\n 1.1002754212746195\n ⋮\n 1.1533008480222793\n 1.1869995074569266\n 1.2148002763177803\n 1.186895006733359\n 1.5476802837961292\n 1.2790798393496807\n 2.3665513040522095\n 1.1021995425749411\n 2.827905395338248","category":"page"},{"location":"howto/mc/","page":"Magnitude of completeness","title":"Magnitude of completeness","text":"Now that the catalog is complete, it is possible to calculate the b-value (see How-to: b-value).","category":"page"},{"location":"howto/mc/#Uncertainty","page":"Magnitude of completeness","title":"Uncertainty","text":"","category":"section"},{"location":"howto/mc/","page":"Magnitude of completeness","title":"Magnitude of completeness","text":"The uncertainty affecting the magnitude of completeness can be estimated with bootstrap.  This can be achieved with Bootstrap.jl. ","category":"page"},{"location":"howto/mc/","page":"Magnitude of completeness","title":"Magnitude of completeness","text":"julia> using Bootstrap\n\njulia> Nboot = 1000   # number of bootstrap samples\n1000\n\njulia> res = bootstrap(x->maxcurv(x,ΔM), mags, BasicSampling(Nboot))\nBootstrap Sampling\n  Estimates:\n     Var │ Estimate  Bias        StdError\n         │ Float64   Float64     Float64\n    ─────┼─────────────────────────────────\n       1 │  1.11202  0.00442277  0.0227948\n  Sampling: BasicSampling\n  Samples:  1000\n  Data:     Vector{Float64}: { 32461 }\n\njulia> stderror(res)\n1-element Vector{Float64}:\n 0.02279475921271632","category":"page"},{"location":"#MagnitudeDistributions.jl-Documentation","page":"Home","title":"MagnitudeDistributions.jl Documentation","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"MagnitudeDistributions is a package developed to facilitate the analysis of frequency-magnitude  distributions of earthquakes. It provides methods to:","category":"page"},{"location":"","page":"Home","title":"Home","text":"estimate the magnitude of completeness;\nestimate the parameters of a frequency-magnitude distribution, such as the b-value;\nsample a theoretical frequency magnitude distribution.","category":"page"},{"location":"","page":"Home","title":"Home","text":"As of now, only the Gutenberg-Richter law is supported.","category":"page"},{"location":"#Installation","page":"Home","title":"Installation","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"import Pkg\nPkg.add(\"MagnitudeDistributions\")","category":"page"},{"location":"utils/#Distributions","page":"Utils","title":"Distributions","text":"","category":"section"},{"location":"utils/","page":"Utils","title":"Utils","text":"histmag","category":"page"},{"location":"utils/#MagnitudeDistributions.histmag","page":"Utils","title":"MagnitudeDistributions.histmag","text":"histmag(mags, binwidth)\n\nGroup the magnitude values mags into magnitude bins of width binwidth.  Return an array containing the center of each bin and an array containing the  number of events in each bin. The left edge of the first bin corresponds to the minimum magnitude in mags.\n\n\n\n\n\n","category":"function"},{"location":"completeness/#Magnitude-of-completeness","page":"Magnitude of completeness","title":"Magnitude of completeness","text":"","category":"section"},{"location":"completeness/","page":"Magnitude of completeness","title":"Magnitude of completeness","text":"note: Note\nmaxcurv, mbass and mbs are based on magnitudes grouped into bins of width ΔM.  As a result, the estimated magnitude of completeness M_c corresponds to  the center of one of the bins. To obtain the effective magnitude of completeness M_0,  it is then necessary to substract from M_c half bin width: M_0 = M_c - ΔM2","category":"page"},{"location":"completeness/","page":"Magnitude of completeness","title":"Magnitude of completeness","text":"maxcurv\nmbass\nmbs","category":"page"},{"location":"completeness/#MagnitudeDistributions.maxcurv","page":"Magnitude of completeness","title":"MagnitudeDistributions.maxcurv","text":"maxcurv(mags, ΔM)\n\nApply the maximum curvature method to compute the magnitude of completeness.\n\nArguments\n\nmags: array storing the magnitude values of an incomplete catalog.\nΔM: bin width to be used to group the magnitude values.`\n\n\n\n\n\nmaxcurv(bincenters, binevents)\n\nApply the maximum curvature method to compute the magnitude of completeness.\n\nArguments\n\nbincenters: array storing the central values of the magnitude bins.\nbinevents: array storing the number of events in the magnitude bins.\n\nbincenters and binevents can be obtained with  histmag(mag, ΔM).\n\n\n\n\n\n","category":"function"},{"location":"completeness/#MagnitudeDistributions.mbass","page":"Magnitude of completeness","title":"MagnitudeDistributions.mbass","text":"mbass(mags, ΔM)\n\nApply the Median-Based Analysis of the Segment Slope method to estimate the  magnitude of completeness.\n\nArguments\n\nmags: array storing the magnitude values of an incomplete catalog.\nΔM: bin width to be used to group the magnitude values.`\n\nReferences\n\nAmorese 2007. Applying a Change-Point Detection Method on Frequency-Magnitude Distributions. Bulletin of the Seismological Society of America 97 (5): 1742–1749. https://doi.org/10.1785/0120060181\nLanzante 1996. Resistant, Robust and Non‐Parametric Techniques for the Analysis  of Climate Data: Theory and Examples, Including Applications to Historical  Radiosonde Station Data. Int. J. Climatol., 16: 1197-1226. https://doi.org/10.1002/(SICI)1097-0088(199611)16:11<1197::AID-JOC89>3.0.CO;2-L\n\n\n\n\n\nmbass(bincenters, binevents)\n\nApply the Median-Based Analysis of the Segment Slope method to estimate the  magnitude of completeness.\n\nArguments\n\nbincenters: array storing the central values of the magnitude bins.\nbinevents: array storing the number of events in the magnitude bins.\n\nbincenters and binevents can be obtained with  histmag(mag, ΔM).\n\n\n\n\n\n","category":"function"},{"location":"completeness/#MagnitudeDistributions.mbs","page":"Magnitude of completeness","title":"MagnitudeDistributions.mbs","text":"mbs(mags, ΔM; winsize=5, minevents=50)\n\nCompute the magnitude of completeness with the b−value stability (MBS) method.\n\nArguments\n\nmags: array storing the magnitude values of an incomplete catalog.\nΔM: bin width to be used to group the magnitude values.`\n\nKeyword arguments\n\nwinsize: window length used for the moving average. Default is 5 magnitude bins\nminevents: minimum number of events allowed when calculating b-values. Defaul is  50 events.\n\nReferences:\n\nCao and Gao, 2002, Temporal variations of seismic b-values beneath northeastern  japan island arc, Geophysical Research Letters, 29, https://doi.org/10.1029/2001GL013775\nWoessner and Wiemer (2005), Assessing the quality of earthquake catalogues:  Estimating the magnitude of completeness and its uncertainty, Bulletin of the Seismological Society of America,  95, https://doi.org/10.1785/0120040007\n\n\n\n\n\n","category":"function"}]
}