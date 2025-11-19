class CreateTransactions < ActiveRecord::Migration[8.0]
  def change
    create_table :transactions do |t|
      t.references :cash, null: false, foreign_key: true

      t.decimal :montant, precision: 18, scale: 2, null: false

      t.string :type_transaction, null: false
      t.string  :categorie
      t.text    :description

      t.date :date_transaction, null: false

      t.timestamps
    end
  end
end
