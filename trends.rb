class Trends

  # Cache @client on init
  def initialize(client, city)
    @client = client
    @city = city
  end

  def top_trends
    @client.trends(@city)
  end

  def to_view
    :displaypage
  end

end
