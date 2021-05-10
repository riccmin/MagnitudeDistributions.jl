@testset "Magnitude of completeness" begin
    b = 1
    M0 = 0.5
    mags = rand(GRclassic(b,M0), 100000)
    filter!(x->rand() < cdf(Normal(0.8,0.2),x), mags)
    ΔM = 0.1

    x, y = histmag(mags,ΔM)
    @test round(maxcurv(mags, ΔM), digits=2) == 0.95    
    @test maxcurv(mags, ΔM) == maxcurv(x,y)
    @test_throws ErrorException("The two input arrays must have the same number of elements") maxcurv([0.1],[1.2,1.6])        

    @test round(mbass(mags, ΔM), digits=2) == 1.25
    @test mbass(mags, ΔM) == mbass(x,y)   
    @test_throws ErrorException("The two input arrays must have the same number of elements") mbass([0.1],[1.2,1.6])        
    @test isnan( mbass(collect(0.1:0.1:1.1),fill(11,11)) )          
    @test isnan( mbass([0.1,0.2],[1.2,1.6]) )
    

    @test round(mbs(mags,ΔM,winsize=5, minevents=50), digits=2) == 1.55
    @test isnan( mbs([0.1,0.2],0.1) )

end
