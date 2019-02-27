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

ActiveRecord::Schema.define(version: 2019_01_24_204300) do

  create_table "theories", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.string "issues"
    t.boolean "success"
    t.date "prove_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "treasure_id"
    t.integer "user_id"
    t.index ["treasure_id"], name: "index_theories_on_treasure_id"
  end

  create_table "treasures", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.string "description"
    t.integer "user_id"
    t.index ["user_id"], name: "index_treasures_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.boolean "admin", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "uid"
    t.string "email"
    t.string "provider"
    t.string "name"
    t.text "image"
  end

end
