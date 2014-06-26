class AddDeviceIdToUserLocation < ActiveRecord::Migration
  def self.up
    add_column :user_locations, :device, :string
  end

  def self.down
    remove_column :user_locations, :device
  end
end
