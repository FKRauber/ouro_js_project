class CreateTreasures < ActiveRecord::Migration[5.2]
  def change
    create_table :treasures do |t|
    	t.belongs_to :user, foreign_key: true
    	t.belongs_to :theory, foreign_key: true
      t.timestamps
    end
  end
end
