class Trends

  # Cache @client on init
  def initialize(client)
    @client = client
  end

  def show_trends(city)
    @client.trends(city)
  end

end
