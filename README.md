# Asms_Angular
# Quy Tắc Commit
* feat: thêm một  tính năng  mới 
* fix: fix bug cho hệ thống
* refactor: sửa code nhưng không fix bug cũng không thêm feature hoặc đôi khi bug cũng được fix từ việc refactor.
* docs: thêm/thay đổi document
* chore: những sửa đổi nhỏ nhặt không liên quan tới code
* style: những thay đổi không làm thay đổi ý nghĩa của code như thay đổi css/ui chẳng hạn.
* perf: code cải tiến về mặt hiệu năng xử lý
* vendor: cập nhật version cho các dependencies, packages.
* build : những thay đổi ảnh hưởng đến hệ thống bản dựng hoặc bên ngoài
# VD 
Code thêm sản phẩm thì : feat:add new product

Cẩn thận khi commit không thì sẽ conflict die :))
# VD Branch
* git checkout : Kiểm tra xem có cao nhiêu nhánh
* git checkout 'branch' : chuyển qua nhánh cần sử dụng
* git checkout -b 'new branch' : tạo mới 1 nhánh
* git push origin 'branch' : đẩy code về nhánh
* Các bước Xóa nhánh :
    - git checkout master
    - git branch -d 'branch'
    - git push origin -d 'branch'    