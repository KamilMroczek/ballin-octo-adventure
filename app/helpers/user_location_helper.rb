# Helper methods defined here can be accessed in any controller or view in the application
require 'set'

module BallinOctoAdventure
  class App
    module UserLocationHelper
      def create_user_location(json, request)
        return nil if json.nil? || json.blank?
        
        refresh_secs = json['refresh_secs']
        provider_type = json['provider_type']
        note = json['note']
        time = json['time']
        accuracy = json['accuracy']
        latitude = json['latitude']
        longitude = json['longitude']
        speed = json['speed']
        bearing = json['bearing']
        altitude = json['altitude']
        gps_on = json['gps_on']
        network_on = json['network_on']
        device = json['device']
        
        ip_address = (request && request.env) ? request.env["HTTP_X_FORWARDED_FOR"] : nil
        
        if time.present?
          Time.zone = 'UTC'
          time = Time.zone.at(time.to_i / 1000)
        else
          time = nil
        end
        
        UserLocation.create(
          :provider_type => provider_type,
          :note => note,
          :refresh_secs => refresh_secs,
          :accuracy => accuracy,
          :latitude => latitude,
          :longitude => longitude,
          :speed => speed,
          :bearing => bearing,
          :altitude => altitude,
          :gps_on => (gps_on.to_i > 0),
          :network_on => (network_on.to_i > 0),
          :time => time,
          :ip_address => ip_address,
          :device => device
        )
      end
    end
    
    def active_days_last_2_weeks
      days = Set.new
      
      # this is to control how many we loop through (50K)
      last_index = UserLocation.count
      start_index = [(last_index - 50000), 0].max
      UserLocation.select([:id, :created_at]).find_each(:start => start_index) do |u|
        days << u.created_at.in_time_zone("Pacific Time (US & Canada)").strftime("%a %B %e, %Y")
      end
      
      # have newest days first
      Time.zone = 'UTC'
      days.to_a.sort { |d| -Time.zone.parse(d).to_i }
    end

    helpers UserLocationHelper
  end
end
