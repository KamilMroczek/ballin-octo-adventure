# Helper methods defined here can be accessed in any controller or view in the application

module BallinOctoAdventure
  class App
    module UserLocationHelper
      def create_user_location(json)
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
          :time => time
        )
      end
    end

    helpers UserLocationHelper
  end
end
