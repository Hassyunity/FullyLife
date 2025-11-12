class AddImageToRoutineItems < ActiveRecord::Migration[8.0]
  def change
    add_column :routine_items, :image, :string
  end
end
