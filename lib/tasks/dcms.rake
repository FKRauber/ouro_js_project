# namespace :db do
#   desc ‘Drop, Create, Migrate, Seed db, Start Rails server’
# 	task dcms: :environment do
# 		puts ‘dropping db…’
# 		Rake::Task[‘db:drop’].invoke
#
# 		puts ‘creating db…’
# 		Rake::Task[‘db:create’].invoke
#
# 		puts ‘running migrations…’
# 		Rake::Task[‘db:migrate’].invoke
#
# 		puts ‘seeding db…’
# 		Rake::Task[‘db:seed’].invoke
#
# 		puts ‘starting rails server…’
# 		exec(‘rails s -p 3001’)
# 	end
# end
