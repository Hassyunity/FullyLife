class RoutineItem < ApplicationRecord
  belongs_to :routine

  validates :title, :start_time, presence: true
  validates :duration_minutes, numericality: { greater_than: 0 }, allow_nil: true
end
