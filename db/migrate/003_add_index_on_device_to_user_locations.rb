class AddIndexOnDeviceToUserLocations < ActiveRecord::Migration
  def self.up
    add_index :user_locations, :device, name: 'idx_user_locations_device'
  end

  def self.down
    remove_index :user_locations, name: 'idx_user_locations_device'
  end
end
