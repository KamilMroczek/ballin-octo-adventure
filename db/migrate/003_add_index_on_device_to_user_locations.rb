class AddIndexOnDeviceToUserLocations < ActiveRecord::Migration
  def self.up
    add_index :user_locations, [:device, :created_at], name: 'idx_user_locations_device_created_at'
  end

  def self.down
    remove_index :user_locations, name: 'idx_user_locations_device_created_at'
  end
end
