class AddUserIdToTreasures < ActiveRecord::Migration[5.2]
  def change
    add_column :treasures, :user_id, :integer
    add_index :treasures, :user_id
  end
end
