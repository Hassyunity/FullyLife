class Routine < ApplicationRecord
  has_many :routine_items, -> { order(:position) }, dependent: :destroy
  validates :title, presence: true
end
