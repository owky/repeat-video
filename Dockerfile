FROM ruby:2.7

WORKDIR work
COPY Gemfile* /

RUN bundle install

ENTRYPOINT ["bundle", "exec", "jekyll"]
CMD ["serve", "-H", "0.0.0.0"]