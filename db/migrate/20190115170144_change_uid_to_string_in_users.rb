class ChangeUidToStringInUsers < ActiveRecord::Migration[5.2]
  def change
    change_column :users, :uid, :string
  end
end
