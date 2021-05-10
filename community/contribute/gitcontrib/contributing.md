## Contributor Checklist

* Create a [GitHub account](https://github.com/signup/free).

* Learn to use [git](https://git-scm.com), the version control system used by GitHub. Try a tutorial such as the one [provided by GitHub](https://try.GitHub.io/levels/1/challenges/1).

* [Fork MagnitudeDistributions](https://github.com/riccmin/MagnitudeDistributions.jl/fork).

* At this point you can
    * [add new functionalities](https://github.com/riccmin/MagnitudeDistributions.jl/blob/main/community/contribute/gitcontrib/functionalities.md) 
    * [improve the documentation](https://github.com/riccmin/MagnitudeDistributions.jl/blob/main/community/contribute/gitcontrib/documentation.md) 
    * [write tests](https://github.com/riccmin/MagnitudeDistributions.jl/blob/main/community/contribute/gitcontrib/tests.md)

Note: Before getting started, it can be helpful to discuss the proposed changes or additions in [Discussions](https://github.com/riccmin/MagnitudeDistributions.jl/discussions).



### Git Recommendations For Pull Requests

 - You can make pull requests for incomplete features to get code review. The convention is to prefix the pull request title with "WIP:" for Work In Progress, or "RFC:" for Request for Comments when work is completed and ready for merging. This will prevent accidental merging of work that is in progress.
 - Avoid working from the `main` branch of your fork, creating a new branch will make it easier if MagnitudeDistributions's `main` changes and you need to update your pull request.
 - Try to [squash](http://gitready.com/advanced/2009/02/10/squashing-commits-with-rebase.html) together small commits that make repeated changes to the same section of code so your pull request is easier to review, and Julia's history won't have any broken intermediate commits. A reasonable number of separate well-factored commits is fine, especially for larger changes.
 - If any conflicts arise due to changes in MagnitudeDistributions's `main`, prefer updating your pull request branch with `git rebase` versus `git merge` or `git pull`, since the latter will introduce merge commits that clutter the git history with noise that makes your changes more difficult to review.
 - Descriptive commit messages are good.
 - Using `git add -p` or `git add -i` can be useful to avoid accidentally committing unrelated changes.
 - GitHub does not send notifications when you push a new commit to a pull request, so please add a comment to the pull request thread to let reviewers know when you've made changes.


### Acknowledgements

This file, [functionalities.md](https://github.com/riccmin/MagnitudeDistributions.jl/blob/main/community/contribute/gitcontrib/functionalities.md), 
[documentation.md](https://github.com/riccmin/MagnitudeDistributions.jl/blob/main/community/contribute/gitcontrib/documentation.md), 
[tests.md](https://github.com/riccmin/MagnitudeDistributions.jl/blob/main/community/contribute/gitcontrib/tests.md) 
are largely based on the CONTRIBUTING.md file found in the [repository](https://github.com/JuliaLang/julia) of the Julia language.