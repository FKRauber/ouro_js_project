class RemoveTheoryIdFromTreasures < ActiveRecord::Migration[5.2]
  def change
    remove_column :treasures, :theory_id, :integer
    remove_column :treasures, :theory_id, :index
  end
end
