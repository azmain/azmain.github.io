---
title: ♦ Daily Git Commands ♦
categories: programming
---

We use `Git` daily to manage our code. So it is very important to know basic git commands. I will write down the commands and their usage below.

#### Basic Git Commands and their usage

```
git init
```

> initialize git & create a .git file in your project folder

```
git status
```

> show the status of your project code if you do any changes

```
git remote add origin https://github.com/your_username/repository_name
```

> before running this command you need to create a code repository in your github account.
> then you can add your remote repository to your local machine.
> the remote repository will be added as origin in your local machine.

```
git add .
```

> add all the changes you have made in your project

```
git commit -m 'commit message'
```

> commit all your changes locally.
> here commit message is your message what you have changed

```
git checkout -b branch_name
```

> create a new branch & checkout(go to) that branch
> everytime you start changing some part of your code, it is better
> to do that change in a new branch keeping your master branch perfect

```
git push origin branch_name
```

> when your changes are done & it is okay, you can use previous commands
> add & commit to save the changes locally. then you can push your branch to origin
> create a merge request.

```
git pull origin master
```

> next time when you start working again, you should always pull from the remote
> repository to your local master branch.
> here you can pull from `master` branch or any other branch if you
> have like `development`

<br>
## <center> MISTAKES </center>

---

#### <center> Forgot To Pull and Did Some Modifications on a New Branch </center>

<hr>
Sometimes it may happen that you forget to pull the latest updates from remote repository and strat working on a new branch! On that case what you can do is

```
git add .
git commit -m 'commit message'
git checkout master
git pull origin branch_name
git checkout -b branch2
git merge branch1
```

> - add all the changes ( suppose you are on branch1 )
> - commit all the staged changes
> - go to master branch
> - pull the latest updates from remote
> - create a new branch and go to that branch
> - merge branch1 changes with branch2 ( branch2 will have all the latest 
    updates from master branch )
> - so branch2 will have all the changes from remote repository ( latest updates )
    and your changes in branch2

---


#### <center> Want To Change The Remote Url </center>

<hr>
Sometimes you might mistakenly add wrong remote url or you want to change the remote url

```
git remote set-url origin https://new-url.com
```

> - will change the remote url of origin

---

