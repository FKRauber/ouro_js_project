class RemoveCreatorFromTheories < ActiveRecord::Migration[5.2]
  def change
    remove_column :theories, :creator, :string
  end
end
