source 'https://rubygems.org'

# Distribute your app as a gem
# gemspec

# Server requirements
# gem 'thin' # or mongrel
# gem 'trinidad', :platform => 'jruby'

# Optional JSON codec (faster performance)
# gem 'oj'

# Project requirements
gem 'rake'

# Component requirements
gem 'sass'
gem 'haml'
gem 'activerecord', '>= 3.1', :require => 'active_record'

# Test requirements
gem 'rr', :require => false, :group => 'test'
gem 'rspec', :group => 'test'
gem 'rack-test', :require => 'rack/test', :group => 'test'

# Padrino Stable Gem
gem 'padrino', '0.12.2'

# Or Padrino Edge
# gem 'padrino', :github => 'padrino/padrino-framework'

# Or Individual Gems
# %w(core support gen helpers cache mailer admin).each do |g|
#   gem 'padrino-' + g, '0.12.2'
# end

gem 'awesome_print'
gem 'padrino-sprockets', :require => "padrino/sprockets"

group :development do
  gem 'annotate'
end

group :development, :test do
  gem 'sqlite3'
end

group :production do
 gem 'pg'
end