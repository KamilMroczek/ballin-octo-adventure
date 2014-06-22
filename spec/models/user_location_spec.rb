# == Schema Information
#
# Table name: user_locations
#
#  id            :integer          not null, primary key
#  provider_type :string(255)
#  note          :string(255)
#  time          :datetime
#  altitude      :float
#  latitude      :float
#  longitude     :float
#  refresh_secs  :integer
#  accuracy      :float
#  speed         :float
#  bearing       :float
#  ip_address    :string(255)
#  gps_on        :boolean
#  network_on    :boolean
#  created_at    :datetime
#  updated_at    :datetime
#

require 'spec_helper'

describe UserLocation do
end
