class List < ActiveRecord::Base
  belongs_to :board
	validates_presence_of :name
	has_many :cards
end
