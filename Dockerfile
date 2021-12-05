FROM ruby:2.7

COPY Gemfile* ./

RUN bundle install

WORKDIR /work

CMD ["jekyll", "serve", "-H", "0.0.0.0"]