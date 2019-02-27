class Theory < ApplicationRecord
	belongs_to :user, foreign_key: :user_id, optional: true
	belongs_to :treasure

	validates :name, presence: true
	validates :description, presence: true
	validates :description, uniqueness: true, on: :create

	scope :success, -> {where(success: true)}

	def self.recent_theories
		order('created_at desc').limit(3)
	end

end
