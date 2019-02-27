class AddNameToTreasure < ActiveRecord::Migration[5.2]
  def change
    add_column :treasures, :name, :string
  end
end
