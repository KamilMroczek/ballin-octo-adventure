class CreateUserLocations < ActiveRecord::Migration
  def self.up
    create_table :user_locations do |t|
      t.string :provider_type
      t.string :note
      t.timestamp :time
      t.float :altitude
      t.float :latitude
      t.float :longitude
      t.integer :refresh_secs
      t.float :accuracy
      t.float :speed
      t.float :bearing
      t.string :ip_address
      t.boolean :gps_on
      t.boolean :network_on
      t.timestamps
    end
  end

  def self.down
    drop_table :user_locations
  end
end
