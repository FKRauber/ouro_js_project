class TreasureSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :user_id

  has_many :theories
  has_many :users
end
