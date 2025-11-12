class Suivi < ApplicationRecord
  validates :start_time, :description, :week, :day, presence: true
end
