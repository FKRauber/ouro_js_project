class AddDescriptionToTreasure < ActiveRecord::Migration[5.2]
  def change
    add_column :treasures, :description, :string
  end
end
