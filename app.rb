require 'twitter'
require 'sinatra'
require_relative 'trends'
require 'haml'

client = Twitter::REST::Client.new do |config|
  config.consumer_key        = ENV['CONKEY']
  config.consumer_secret     = ENV['CONSEC']
  config.access_token        = ENV['OAUTH']
  config.access_token_secret = ENV['OAUTH_S']
end

get '/' do
  @trends = Trends.new(client, 2391279)
  haml @trends.to_view
  #send_file 'views/index.html'
end
