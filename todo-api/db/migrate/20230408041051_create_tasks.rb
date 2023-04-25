class CreateTasks < ActiveRecord::Migration[7.0]
  def change
    create_table :tasks do |t|
      t.string :title
      t.boolean :done
      t.integer :priority, default: 1
      t.timestamps
    end
  end
end
