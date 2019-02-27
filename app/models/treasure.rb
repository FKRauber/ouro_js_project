class Treasure < ApplicationRecord
	has_many :theories, :dependent => :destroy
	has_many :users, through: :theories
	accepts_nested_attributes_for :theories, allow_destroy: true

	belongs_to :creating_user, foreign_key: :user_id, optional: true

	validates :name, presence: true
	validates :name, uniqueness: true, on: :create

	def theories_attributes=(theory_attributes)
		theory_attributes.values.each do |atts|
			theory = Theory.find_or_create_by(atts)
			self.theories << theory
		end
	end


end
