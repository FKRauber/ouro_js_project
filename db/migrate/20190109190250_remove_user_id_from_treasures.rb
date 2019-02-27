class RemoveUserIdFromTreasures < ActiveRecord::Migration[5.2]
  def change
    remove_column :treasures, :user_id, :integer
  end
end
