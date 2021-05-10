@testset "Maximum likelihood" begin
    b = 1.0
    M0 = 0.5
    mags = rand(GRclassic(b,M0), 100000)
    filter!(x->rand() < cdf(Normal(0.8,0.2),x), mags)
    ΔM = 0.1

    M0 = 1.25 - ΔM/2
    mags = mags[mags .>= M0]

    @test round.( bvalue(fit_mle(GRclassic,mags,M0)), digits=3) == 0.995
    @test round.( fit_stderr(fit_mle(GRclassic,mags,M0), mags), digits=3) == 0.007

    @test round.( bvalue(fit_binned(GRclassic,mags,M0,ΔM)), digits=3) == 0.999
    @test round.( fit_stderrbinned(fit_binned(GRclassic,mags,M0,ΔM), mags, ΔM), digits=3) == 0.007

end