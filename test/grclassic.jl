@testset "GRclassic" begin
    b = 1
    M0 = 0.5
    d = GRclassic(b,M0)

    @test rate(d) == 1*log(10) 
    @test location(d) == M0
    @test params(d) == (b, M0)

    @test  bvalue(d) == 1.
    @test  avalue(d, 100, 0.1) == 2.55

    @test  rand(d, 3) == [0.6547030177365674, 0.8281037053138567, 0.7333794310588824]
    @test  mean(d) == 1/rate(d) + M0

    @test pdf(d, 0.1) == 0.0 
    @test round(pdf(d, 1.2), digits=2) == 0.46

    @test logpdf(d, 0.1) == -Inf 
    @test round(logpdf(d,1.2), digits=2) == -0.78

    @test cdf(d, 0.1) == 0.0
    @test round(cdf(d,1.2), digits=2) == 0.8

    @test logcdf(d, 0.1) == -Inf
    @test round(logcdf(d,1.2), digits=2) == round(log(cdf(d,1.2)), digits=2)


    @test ccdf(d, 0.1) == 0.0
    @test round(ccdf(d,1.2), digits=2) == 0.2

    @test logccdf(d, 0.1) == -Inf
    @test round(logccdf(d,1.2), digits=2) == round(log(ccdf(d,1.2)), digits=2)

end