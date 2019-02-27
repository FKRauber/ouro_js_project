class AddCreatorToTheories < ActiveRecord::Migration[5.2]
  def change
    add_column :theories, :creator, :string
  end
end
