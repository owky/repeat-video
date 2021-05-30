# repeat-video

## Jekyll

docker build

    $ docker build . -t my-jekyll

jekyll serve

    $ docker run -it -v ${PWD}:/work -p 4000:4000 my-jekyll

jekyll build

    $ docker run -it -v ${PWD}:/work my-jekyll build
