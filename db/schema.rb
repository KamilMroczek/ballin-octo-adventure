# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 3) do

  create_table "user_locations", force: true do |t|
    t.string   "provider_type"
    t.string   "note"
    t.datetime "time"
    t.float    "altitude"
    t.float    "latitude"
    t.float    "longitude"
    t.integer  "refresh_secs"
    t.float    "accuracy"
    t.float    "speed"
    t.float    "bearing"
    t.string   "ip_address"
    t.boolean  "gps_on"
    t.boolean  "network_on"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "device"
  end

  add_index "user_locations", ["device", "created_at"], name: "idx_user_locations_device_created_at"

end
