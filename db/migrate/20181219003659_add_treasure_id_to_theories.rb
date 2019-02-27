class AddTreasureIdToTheories < ActiveRecord::Migration[5.2]
  def change
    add_column :theories, :treasure_id, :integer
    add_index :theories, :treasure_id
  end
end
