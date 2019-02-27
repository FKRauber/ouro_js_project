class User < ApplicationRecord
	has_secure_password

	has_many :theories
	has_many :created_treasure
	has_many :treasures, through: :theories

	validates :username && :email, presence: true
	validates :username, uniqueness: true, on: :create

	def self.find_or_create_by_oa(auth_hash)
		where(:email => auth_hash["info"]["email"]).first_or_create do |u|
			u.password = SecureRandom.hex
		end
	end
end
