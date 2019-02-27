class CreateTheories < ActiveRecord::Migration[5.2]
  def change
    create_table :theories do |t|
    	t.string :name
    	t.string :description
    	t.string :issues
    	t.boolean :success
    	t.date :prove_date

      t.timestamps
    end
  end
end
