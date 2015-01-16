require 'twitter'
require 'sinatra'
require_relative 'trends'
require 'haml'
require 'json'

client = Twitter::REST::Client.new do |config|
  config.consumer_key        = ENV['CONKEY']
  config.consumer_secret     = ENV['CONSEC']
  config.access_token        = ENV['OAUTH']
  config.access_token_secret = ENV['OAUTH_S']
end

get '/' do
  haml :displaypage
end

post '/', :provides => :json do
  @trends = Trends.new(client)

  @trends.show_trends(params['id']).to_h.to_json
end
