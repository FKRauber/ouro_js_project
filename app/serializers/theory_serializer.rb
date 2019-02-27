class TheorySerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :issues, :success, :prove_date, :treasure_id, :user_id
  belongs_to :treasure, serializer: TheoryTreasureSerializer
end
